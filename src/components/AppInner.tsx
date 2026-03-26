import { useApp } from '../context/AppContext';
import Login from './Login';
import Sidebar from './sidebar/Sidebar';
import Workspace from './workspace/Workspace';
import ToastContainer from './ui/ToastContainer';
import SearchModal from './modals/SearchModal';
import SettingsModal from './modals/SettingsModal';
import TrashModal from './modals/TrashModal';
import { useGlobalShortcuts } from '../hooks/useKeyboardShortcuts';
import Spinner from './ui/Spinner';

function AppInner() {
  const {
    user, loading, pages,
    activePageId,
    updatePage,
    activeModal, closeModal,
    settings,
  } = useApp();

  useGlobalShortcuts();

  if (loading) {
    return (
      <div className="loading-screen">
        <Spinner size={28} />
        <p>Opening Dashy...</p>
      </div>
    );
  }

  if (!user) return <Login />;

  const activePage = pages.find(p => p.$id === activePageId);

  return (
    <div
      className="dashy-app"
      data-font={settings?.font_style ?? 'serif'}
      data-small-text={settings?.small_text ? 'true' : 'false'}
      data-full-width={settings?.full_width ? 'true' : 'false'}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Workspace */}
      <Workspace
        page={activePage}
        onUpdatePage={data => activePageId && updatePage(activePageId, data)}
      />

      {/* Global toasts */}
      <ToastContainer />

      {/* Modals */}
      <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} />
      <SettingsModal isOpen={activeModal === 'settings'} onClose={closeModal} />
      <TrashModal isOpen={activeModal === 'trash'} onClose={closeModal} />
    </div>
  );
}

export default AppInner;
