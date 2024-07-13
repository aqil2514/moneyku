export const AnimateSpinner = ({ message }: { message: string }) => {
  return (
    <div className="flex gap-1">
      <div className="popup-spinner"></div>
      <p className="my-auto font-playfair-bold text-info">{message}</p>
    </div>
  );
};
