import React, { useState, useEffect } from 'react';
import {
  Shield,
  RotateCcw,
  X,
  BookOpen,
  Users,
  CheckCircle,
  Save,
  Trash2,
  Plus,
} from 'lucide-react';
import {
  getSavedPathwayRules,
  getPathwayLeads,
  savePathwayRules,
  resetPathwayRules,
  STREAM_OPTIONS,
  type PathwayRule,
  type PathwayLead,
} from '../../data/pathways';

interface PathwayAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRulesUpdated?: () => void;
}

export const PathwayAdminModal: React.FC<PathwayAdminModalProps> = ({
  isOpen,
  onClose,
  onRulesUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'leads'>('rules');
  const [rules, setRules] = useState<PathwayRule[]>([]);
  const [leads, setLeads] = useState<PathwayLead[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRules(getSavedPathwayRules());
      setLeads(getPathwayLeads());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateRule = (id: string, patch: Partial<PathwayRule>) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const handleSaveRules = () => {
    savePathwayRules(rules);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
    onRulesUpdated?.();
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all entry requirements to official BIET defaults?')) {
      const defaults = resetPathwayRules();
      setRules(defaults);
      onRulesUpdated?.();
    }
  };

  const toggleStream = (ruleId: string, stream: string) => {
    const rule = rules.find((r) => r.id === ruleId);
    if (!rule) return;
    const exists = rule.requiredALStreams.includes(stream);
    const updated = exists
      ? rule.requiredALStreams.filter((s) => s !== stream)
      : [...rule.requiredALStreams, stream];
    updateRule(ruleId, { requiredALStreams: updated });
  };

  const addAltQual = (ruleId: string, text: string) => {
    if (!text.trim()) return;
    const rule = rules.find((r) => r.id === ruleId);
    if (!rule) return;
    updateRule(ruleId, {
      acceptedAlternativeQualifications: [...rule.acceptedAlternativeQualifications, text.trim()],
    });
  };

  const removeAltQual = (ruleId: string, index: number) => {
    const rule = rules.find((r) => r.id === ruleId);
    if (!rule) return;
    updateRule(ruleId, {
      acceptedAlternativeQualifications: rule.acceptedAlternativeQualifications.filter(
        (_, idx) => idx !== index
      ),
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#001428] border border-[#1a3b61]/60 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-gradient-to-r from-[#001a39] to-[#002147] border-b border-[#1a3b61]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fdc800]/15 border border-[#fdc800]/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#fdc800]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white">
                  BIET Admissions & Pathway Rule Manager
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#fdc800] text-[#002147]">
                  Staff Console
                </span>
              </div>
              <p className="text-xs text-white/60">
                Configure entry criteria, grade thresholds, and view student pathway leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDefaults}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 pt-3 bg-[#001a39] border-b border-[#1a3b61]/40 flex gap-4">
          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'rules'
                ? 'border-[#fdc800] text-[#fdc800]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Course Entry Requirements Rules ({rules.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'border-[#fdc800] text-[#fdc800]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Prospective Student Leads ({leads.length})
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'rules' ? (
            <div className="space-y-6">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-[#1E1E1E] border border-white/10 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#fdc800]">
                        {rule.category.toUpperCase()}
                      </span>
                      <h3 className="text-base font-bold text-white">{rule.programmeTitle}</h3>
                    </div>
                    <label className="inline-flex items-center gap-2 text-xs text-white/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rule.isActive}
                        onChange={(e) => updateRule(rule.id, { isActive: e.target.checked })}
                        className="rounded border-white/20 bg-black text-[#fdc800] focus:ring-[#fdc800]"
                      />
                      Active in Pathway Tool
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-white/60 uppercase mb-1">
                        Min G.C.E. A/L Passes Required
                      </label>
                      <select
                        value={rule.minALPasses}
                        onChange={(e) =>
                          updateRule(rule.id, { minALPasses: Number(e.target.value) })
                        }
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value={1}>1 Pass</option>
                        <option value={2}>2 Passes (Standard)</option>
                        <option value={3}>3 Passes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/60 uppercase mb-1">
                        Min O/L Maths Grade
                      </label>
                      <select
                        value={rule.minOLMathsGrade}
                        onChange={(e) =>
                          updateRule(rule.id, { minOLMathsGrade: e.target.value })
                        }
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="A">Grade A</option>
                        <option value="B">Grade B</option>
                        <option value="C">Grade C (Credit)</option>
                        <option value="S">Grade S (Simple Pass)</option>
                        <option value="Any">Any</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white/60 uppercase mb-1">
                        Min O/L English Grade
                      </label>
                      <select
                        value={rule.minOLEnglishGrade}
                        onChange={(e) =>
                          updateRule(rule.id, { minOLEnglishGrade: e.target.value })
                        }
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="A">Grade A</option>
                        <option value="B">Grade B</option>
                        <option value="C">Grade C (Credit)</option>
                        <option value="S">Grade S (Simple Pass)</option>
                        <option value="Any">Any</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/60 uppercase mb-1.5">
                      Accepted A/L Streams for Direct Entry
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['Any Stream', ...STREAM_OPTIONS].map((stream) => {
                        const selected = rule.requiredALStreams.includes(stream);
                        return (
                          <button
                            key={stream}
                            type="button"
                            onClick={() => toggleStream(rule.id, stream)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                              selected
                                ? 'bg-[#fdc800]/20 text-[#fdc800] border-[#fdc800]/50'
                                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                            }`}
                          >
                            {stream}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-white/60 uppercase mb-1">
                        Recommended Foundation / Bridge Course
                      </label>
                      <input
                        type="text"
                        value={rule.progressionPathwayCourse}
                        onChange={(e) =>
                          updateRule(rule.id, { progressionPathwayCourse: e.target.value })
                        }
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-white/60 uppercase mb-1">
                        Progression Advisory Note
                      </label>
                      <input
                        type="text"
                        value={rule.progressionNote}
                        onChange={(e) => updateRule(rule.id, { progressionNote: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/60 uppercase mb-1.5">
                      Accepted Alternative Diplomas / Qualifications
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {rule.acceptedAlternativeQualifications.map((qual, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs text-white/80"
                        >
                          {qual}
                          <button
                            type="button"
                            onClick={() => removeAltQual(rule.id, idx)}
                            className="text-white/40 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add accepted qualification (e.g. NVQ Level 5)..."
                        id={`alt-input-${rule.id}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            addAltQual(rule.id, input.value);
                            input.value = '';
                          }
                        }}
                        className="flex-1 bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById(
                            `alt-input-${rule.id}`
                          ) as HTMLInputElement | null;
                          if (input) {
                            addAltQual(rule.id, input.value);
                            input.value = '';
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {leads.length === 0 ? (
                <div className="text-center py-12 bg-white/[0.02] rounded-2xl border border-white/10">
                  <Users className="w-10 h-10 text-white/20 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white/70">
                    No student pathway leads recorded yet
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    Leads submitted via the Find My Path counsellor request form will appear here.
                  </p>
                </div>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{lead.fullName}</span>
                        <span className="text-[10px] font-mono bg-[#fdc800]/15 text-[#fdc800] px-2 py-0.5 rounded">
                          {lead.id}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        {lead.phone} • {lead.email} • {lead.city}
                      </p>
                      <p className="text-xs text-white/80 mt-2">
                        <strong className="text-[#fdc800]">Qualifications:</strong>{' '}
                        {lead.profile.qualifications.join(', ')} ({lead.profile.stream})
                      </p>
                      <p className="text-xs text-white/80 mt-0.5">
                        <strong className="text-[#fdc800]">Matched Courses:</strong>{' '}
                        {(
                          lead.matchedCourses ||
                          lead.recommendedProgrammes?.map((p) => p.title) ||
                          []
                        ).join(', ')}
                      </p>
                      {lead.notes && (
                        <p className="text-xs text-white/60 italic mt-1">"{lead.notes}"</p>
                      )}
                    </div>
                    <div className="text-right text-[11px] text-white/40 shrink-0">
                      {new Date(lead.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[#001a39] border-t border-[#1a3b61]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {savedNotice && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle className="w-4 h-4" /> Changes saved to pathway engine!
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10"
            >
              Close
            </button>
            {activeTab === 'rules' && (
              <button
                onClick={handleSaveRules}
                className="liquid-yellow-btn px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#002147] flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save Rules & Update Engine
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

