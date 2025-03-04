import { FC, useEffect, useState } from "react";
import Button from "../ui/Button";
import { JsonEditor, githubLightTheme, githubDarkTheme } from "json-edit-react";
import { Copy, FileDown } from "lucide-react";
import { toast } from "sonner";

interface IMockData {
  json: any;
}

const MockData: FC<IMockData> = ({ ...props }) => {
  const [mode, setMode] = useState("");

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(props.json, null, 2);
    navigator.clipboard
      .writeText(jsonString)
      .then(() => toast.info(<div className="font-primary w-max">Copied!</div>))
      .catch((err) => console.error("Failed to copy:", err));
  };

  const downloadJson = () => {
    const jsonString = JSON.stringify(props.json, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mock.json";
    a.click();
    URL.revokeObjectURL(url); // Cleanup
  };

  const getActionSection = () => {
    return (
      <div className="col-span-1 sticky rounded-lg border border-border p-4 bg-neutral-100 h-max flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Button
            className="bg-transparent text-font-primary-100 border border-primary-100 px-8 py-2 w-full flex justify-center gap-2 items-center"
            onClick={copyToClipboard}
          >
            <Copy size={18} />
            Copy to clipbord
          </Button>
          <Button
            className="bg-primary-100 text-font-secondary-100 px-8 py-2 w-full flex justify-center gap-2 items-center"
            onClick={downloadJson}
          >
            <FileDown size={18} /> Download as JSON File
          </Button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setMode(localStorage.getItem("theme") || "");
  }, [localStorage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-2 h-full md:h-[calc(100vh-200px)] overflow-hidden">
      <div className="block md:hidden mb-2">{getActionSection()}</div>
      <div className="col-span-3 rounded-lg border border-border p-4 bg-neutral-100 h-full overflow-hidden">
        <div className="h-full overflow-y-auto pb-4">
          <JsonEditor
            showArrayIndices
            data={props.json}
            rootName=""
            collapse={2}
            collapseAnimationTime={300}
            indent={4}
            enableClipboard={false}
            restrictAdd
            restrictDrag
            restrictEdit
            restrictDelete
            theme={{
              styles: {
                ...(mode === "light"
                  ? githubLightTheme.styles
                  : githubDarkTheme.styles),
                container: {
                  ...(mode === "light"
                    ? (githubLightTheme.styles?.container as any)
                    : (githubDarkTheme?.styles?.container as any)),
                  backgroundColor: "transparent", // Override only the background color
                },
              },
            }}
            rootFontSize={15}
          />
        </div>
      </div>
      <div className="hidden md:block">{getActionSection()}</div>
    </div>
  );
};

export default MockData;
