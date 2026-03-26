import { Moon, Sun } from 'lucide-react';
import Modal from '../ui/Modal';
import { useApp } from '../../context/AppContext';
import { account } from '../../lib/appwrite';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user, settings, updateSettings } = useApp();

  const handleLogout = async () => {
    await account.deleteSession('current');
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="lg">
      <div className="settings-modal">
        {/* Account */}
        <section className="settings-section">
          <h3 className="settings-section-title">Account</h3>
          <div className="settings-row">
            <div className="settings-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="settings-account-info">
              <span className="settings-name">{user?.name || 'User'}</span>
              <span className="settings-email">{user?.email}</span>
            </div>
          </div>
          <button className="settings-signout-btn" onClick={handleLogout}>Sign out</button>
        </section>

        <div className="settings-divider" />

        {/* Appearance */}
        <section className="settings-section">
          <h3 className="settings-section-title">Appearance</h3>

          <div className="settings-field">
            <label>Theme</label>
            <div className="settings-toggle-group">
              {(['light', 'dark', 'system'] as const).map(t => (
                <button
                  key={t}
                  className={`settings-toggle-btn ${settings?.theme === t ? 'active' : ''}`}
                  onClick={() => updateSettings({ theme: t })}
                >
                  {t === 'light' && <Sun size={14} />}
                  {t === 'dark' && <Moon size={14} />}
                  {t === 'system' && <span style={{ fontSize: 12 }}>Auto</span>}
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-field">
            <label>Font style</label>
            <div className="settings-toggle-group">
              {(['serif', 'sans', 'mono'] as const).map(f => (
                <button
                  key={f}
                  className={`settings-toggle-btn ${settings?.font_style === f ? 'active' : ''}`}
                  onClick={() => updateSettings({ font_style: f })}
                  style={{
                    fontFamily: f === 'serif' ? 'Georgia, serif' : f === 'mono' ? 'monospace' : 'sans-serif',
                  }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-field">
            <label>Small text</label>
            <ToggleSwitch
              checked={settings?.small_text ?? false}
              onChange={v => updateSettings({ small_text: v })}
            />
          </div>

          <div className="settings-field">
            <label>Full width</label>
            <ToggleSwitch
              checked={settings?.full_width ?? false}
              onChange={v => updateSettings({ full_width: v })}
            />
          </div>
        </section>

        <div className="settings-divider" />

        {/* Keyboard shortcuts */}
        <section className="settings-section">
          <h3 className="settings-section-title">Keyboard Shortcuts</h3>
          <div className="shortcut-grid">
            {[
              ['New page', '⌘N'],
              ['Search', '⌘K'],
              ['Toggle sidebar', '⌘\\'],
              ['Bold', '⌘B'],
              ['Italic', '⌘I'],
              ['Shortcut help', '?'],
              ['Close modal', 'Esc'],
            ].map(([action, key]) => (
              <div key={action} className="shortcut-row">
                <span className="shortcut-action">{action}</span>
                <kbd className="shortcut-key">{key}</kbd>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Modal>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      className={`toggle-switch ${checked ? 'on' : 'off'}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className="toggle-thumb" />
    </button>
  );
}
