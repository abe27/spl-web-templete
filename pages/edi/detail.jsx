import { MainLayOut } from "@/components";
import { useEffect } from "react";

const EdiDetailPage = () => {
  useEffect(() => {}, []);

  return (
    <MainLayOut
      title={`แสดงข้อมูล EDI TEXT`}
      description={`จัดการข้อมูล EDI TEXT`}
    >
      <div className="bg-gray-400 mockup-code">
        <pre data-prefix="$">
          <code>npm i daisyui</code>
        </pre>
        <pre data-prefix=">" className="text-warning">
          <code>installing...</code>
        </pre>
        <pre data-prefix=">" className="text-success">
          <code>Done!</code>
        </pre>
      </div>
    </MainLayOut>
  );
};

export default EdiDetailPage;
