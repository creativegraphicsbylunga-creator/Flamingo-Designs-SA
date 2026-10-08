import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/mockData';
import { Upload, FileCheck, CheckCircle2, AlertTriangle, FileCode, ArrowRight, MessageSquare, RefreshCw } from 'lucide-react';

export const ArtworkUploadSection: React.FC<{ onNavigateToPortal?: () => void }> = ({ onNavigateToPortal }) => {
  const { currentUser, addArtworkFile } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobReference, setJobReference] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const supportedFormats = [
    'PDF', 'JPG', 'PNG', 'SVG', 'AI', 'EPS', 'PSD', 'ZIP', 'DOC', 'DOCX'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setErrorMessage('');
    setUploadSuccess(false);
    
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setErrorMessage('File exceeds maximum upload size of 100MB. Please use a compressed ZIP or provide a WeTransfer link.');
      return;
    }

    setSelectedFile(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            // Commit to AppContext
            addArtworkFile({
              fileName: selectedFile.name,
              fileSize: selectedFile.size,
              fileType: selectedFile.type || 'application/octet-stream',
              notes: clientNotes || 'Uploaded via website artwork portal',
              jobReference: jobReference || 'Website Submission',
              previewUrl: selectedFile.type.startsWith('image/')
                ? URL.createObjectURL(selectedFile)
                : undefined
            });

            setUploading(false);
            setUploadProgress(100);
            setUploadSuccess(true);
          }, 400);
          return 90;
        }
        return prev + 25;
      });
    }, 150);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setJobReference('');
    setClientNotes('');
    setUploadProgress(0);
    setUploadSuccess(false);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <section id="upload" className="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            <Upload className="w-3.5 h-3.5" />
            <span>Production Dispatch</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Artwork & Pre-Flight Upload Center
          </h2>
          <p className="text-zinc-400 text-sm mt-2 font-light leading-relaxed">
            Send high-resolution print files or digital brand assets straight to our studio prepress desk. All uploads undergo automated format verification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Upload Drag and Drop form */}
          <div className="lg:col-span-7 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            
            {uploadSuccess ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Artwork Upload Complete!
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto">
                  <strong className="text-white">{selectedFile?.name}</strong> has been transferred to Flamingo Designs SA pre-flight review. It is now tracked in your client portal.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(`Hi Flamingo Designs SA, I just uploaded artwork "${selectedFile?.name}" for ${currentUser.company || currentUser.name}. Please check pre-flight status.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Notify Studio on WhatsApp</span>
                  </a>

                  {onNavigateToPortal && (
                    <button
                      onClick={onNavigateToPortal}
                      className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <span>View in Client Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={resetForm}
                    className="px-4 py-2.5 text-zinc-400 hover:text-zinc-200 font-medium text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Upload Another File</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-6">
                
                {/* Drag and drop zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    dragActive
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-zinc-700 hover:border-zinc-500 bg-zinc-950/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.svg,.ai,.eps,.psd,.zip,.doc,.docx"
                    className="hidden"
                  />

                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 mx-auto flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>

                  <p className="font-display font-semibold text-white text-sm">
                    {selectedFile ? (
                      <span className="text-orange-400 font-mono">{selectedFile.name}</span>
                    ) : (
                      <span>Drop your artwork file here, or <span className="text-orange-400 underline">browse files</span></span>
                    )}
                  </p>

                  <p className="text-xs text-zinc-400 mt-1">
                    {selectedFile
                      ? `Size: ${formatFileSize(selectedFile.size)} · Click to change`
                      : 'Supports PDF, JPG, PNG, SVG, AI, EPS, PSD, ZIP, DOC, DOCX up to 100MB'}
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Progress bar */}
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Uploading to Pre-Press Server...</span>
                      <span className="font-mono tabular-nums">{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Job reference and notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Project or Quote Reference (Optional)
                    </label>
                    <input
                      type="text"
                      value={jobReference}
                      onChange={e => setJobReference(e.target.value)}
                      placeholder="e.g. FD-2026-084 or Horizon Cards"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Client / Company Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`${currentUser.name} (${currentUser.company})`}
                      className="w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-xl text-xs text-zinc-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Production Notes or Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={clientNotes}
                    onChange={e => setClientNotes(e.target.value)}
                    placeholder="e.g. Please check 3mm bleed margin, double-sided matt lamination required, delivery to Sandton."
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {uploading ? (
                    <span>Verifying & Transferring File...</span>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Submit Artwork for Pre-Press Verification</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Right: Pre-Flight Guidelines & Specs checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-5">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Pre-Flight Print Preparation Guide</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <span className="font-bold text-zinc-200 block mb-1">1. Color Space & Profile</span>
                  <p className="text-zinc-400 leading-relaxed">
                    Set artwork to <strong className="text-zinc-300">CMYK</strong> color mode (Fogra39 or Coated GRACoL) for commercial printing. RGB files will be converted automatically.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <span className="font-bold text-zinc-200 block mb-1">2. Resolution & Bleed Margins</span>
                  <p className="text-zinc-400 leading-relaxed">
                    Minimum <strong className="text-zinc-300">300 DPI</strong> at 100% scale. Include <strong className="text-zinc-300">3mm bleed</strong> on all trim edges and keep text 4mm inside the safe zone.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
                  <span className="font-bold text-zinc-200 block mb-1">3. Fonts & Vector Outlines</span>
                  <p className="text-zinc-400 leading-relaxed">
                    Convert all text fonts to curves / outlines (<code className="text-orange-400 font-mono">Ctrl+Shift+O</code> in Illustrator) or embed fonts in high-res PDF/X-1a.
                  </p>
                </div>
              </div>

              {/* Supported Badges */}
              <div className="pt-3 border-t border-zinc-800">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Accepted Formats</p>
                <div className="flex flex-wrap gap-1.5">
                  {supportedFormats.map(fmt => (
                    <span key={fmt} className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-zinc-300">
                      .{fmt.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct WhatsApp help card */}
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-emerald-300">Need prepress assistance?</p>
                <p className="text-[11px] text-zinc-400">Our senior graphic designers can prepare or convert your file.</p>
              </div>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent('Hi Flamingo Designs, I have a question about prepping artwork files.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
