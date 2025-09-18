interface formPreviewProps {
  // Define any props if needed in the future
  formPreviewData?: any;
}

function formPreview({ formPreviewData }: formPreviewProps) {
  return (
    <div className="w-full dark:bg-gray-600 h-12 rounded-2xl p-3">
      formPreview
    </div>
  );
}

export default formPreview;
