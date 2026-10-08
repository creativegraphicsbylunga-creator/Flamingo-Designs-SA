import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/mockData';
import { Calendar, Clock, Video, CheckCircle2, X, ExternalLink, Download } from 'lucide-react';
import { Booking } from '../types';

export const ConsultationBookingModal: React.FC = () => {
  const { activeModal, setActiveModal, currentUser, addBooking } = useApp();

  const [consultationType, setConsultationType] = useState('30-min Creative Discovery Call');
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedTime, setSelectedTime] = useState('11:00 SAST');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (activeModal !== 'booking') return null;

  const consultationTypes = [
    { title: '30-min Creative Discovery Call', desc: 'Discuss new branding, print campaigns, or website briefs' },
    { title: '45-min Brand Identity & Logo Strategy', desc: 'In-depth visual style exploration & corporate identity audit' },
    { title: '30-min Print Pre-Flight & Spec Review', desc: 'Paper stocks, finishes (foil/UV), die-cuts & packaging run' },
    { title: '45-min Web & Hosting Architecture', desc: 'Website wireframe planning, e-commerce, and domain transfer' }
  ];

  const timeSlots = [
    '09:30 SAST',
    '11:00 SAST',
    '12:30 SAST',
    '14:00 SAST',
    '15:30 SAST',
    '16:30 SAST'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking = addBooking({
      clientName: currentUser.name,
      clientEmail: currentUser.email,
      clientPhone: currentUser.phone,
      company: currentUser.company,
      consultationType,
      date: selectedDate,
      time: selectedTime,
      notes
    });

    setConfirmedBooking(newBooking);
  };

  const closeModal = () => {
    setActiveModal(null);
    setConfirmedBooking(null);
  };

  // Build real Google Calendar Web Link
  const buildGoogleCalendarLink = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`Flamingo Designs SA - ${confirmedBooking.consultationType}`);
    const details = encodeURIComponent(
      `Consultation with Flamingo Designs SA Creative Director.\nClient: ${confirmedBooking.clientName} (${confirmedBooking.company})\nPhone/WhatsApp: ${confirmedBooking.clientPhone}\nGoogle Meet Link: ${confirmedBooking.googleMeetUrl}\nNotes: ${confirmedBooking.notes || 'None'}`
    );
    const location = encodeURIComponent('Google Meet (Online Video Consultation)');
    
    // Format YYYYMMDDTHHMMSSZ roughly
    const dateClean = confirmedBooking.date.replace(/-/g, '');
    const startTime = '090000Z';
    const endTime = '094500Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateClean}T${startTime}/${dateClean}T${endTime}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Flamingo Designs SA//Consultation Booking//EN
BEGIN:VEVENT
SUMMARY:Flamingo Designs SA Consultation - ${confirmedBooking.consultationType}
DESCRIPTION:Video consultation with creative director.\\nClient: ${confirmedBooking.clientName}\\nMeet URL: ${confirmedBooking.googleMeetUrl}
LOCATION:Google Meet
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T090000Z
DTEND:${confirmedBooking.date.replace(/-/g, '')}T094500Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Flamingo-Designs-Consultation-${confirmedBooking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Book a Google Meet Consultation
              </h3>
              <p className="text-xs text-zinc-400">Direct consultation with Flamingo Designs SA Director</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {confirmedBooking ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-white">
                  Appointment Confirmed!
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  We look forward to meeting with <strong className="text-zinc-200">{confirmedBooking.clientName}</strong>.
                </p>
              </div>

              {/* Details card */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Consultation:</span>
                  <span className="font-semibold text-white">{confirmedBooking.consultationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Date & Time:</span>
                  <span className="font-mono text-orange-400 font-semibold">{confirmedBooking.date} @ {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                  <span className="text-zinc-400">Google Meet Link:</span>
                  <a
                    href={confirmedBooking.googleMeetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-mono underline flex items-center gap-1"
                  >
                    <span>{confirmedBooking.googleMeetUrl.replace('https://', '')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={buildGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={downloadIcsFile}
                  className="w-full sm:w-1/2 py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download (.ics)</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={closeModal}
                  className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Consultation type */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  1. Select Consultation Focus
                </label>
                <div className="space-y-2">
                  {consultationTypes.map((type, i) => (
                    <div
                      key={i}
                      onClick={() => setConsultationType(type.title)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                        consultationType === type.title
                          ? 'bg-orange-500/10 border-orange-500/80 text-white'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <p className="text-xs font-semibold text-zinc-200">{type.title}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    2. Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    3. Select Time (SAST)
                  </label>
                  <select
                    value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Brief Overview or Meeting Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Would like to discuss logo redesign and 500 business cards print batch..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Client info reminder */}
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                <div>
                  <span>Booking for: </span>
                  <strong className="text-zinc-200">{currentUser.name}</strong> ({currentUser.email})
                </div>
                <span className="font-mono text-emerald-400">No charge</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Confirm Google Meet Consultation</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
