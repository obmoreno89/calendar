import { useDispatch, useSelector } from 'react-redux';
import { onOpenDateModal, onClosedateModal } from '../store/ui/uiSlice';

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onClosedateModal());
  };

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  };
};
