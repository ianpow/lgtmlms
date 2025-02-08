import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Upload, X } from "lucide-react";

interface LogoUploadProps {
  currentLogo?: string;
  onUpload: (logo: string) => void;
  onRemove: () => void;
}

const LogoUpload = ({ currentLogo, onUpload, onRemove }: LogoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState(currentLogo);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        onUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Label>Platform Logo</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Recommended size: 150x40px (max height: 40px)
          </p>
        </div>

        {previewUrl ? (
          <div className="flex items-center gap-4">
            <div className="relative w-[150px] h-[40px]">
              <img
                src={previewUrl}
                alt="Logo preview"
                className="max-h-[40px] w-auto object-contain"
              />
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setPreviewUrl(undefined);
                onRemove();
              }}
            >
              <X className="h-4 w-4 mr-2" /> Remove
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("logo-upload")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" /> Upload Logo
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LogoUpload;
