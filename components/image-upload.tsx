"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onImageChange: (file: File | null) => void
  currentImage?: File | null
  className?: string
  maxSize?: number // in MB
  accept?: string[]
}

export function ImageUpload({
  onImageChange,
  currentImage,
  className,
  maxSize = 10,
  accept = ["image/jpeg", "image/png", "image/gif", "image/webp"],
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0]
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(`File size must be less than ${maxSize}MB`)
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Please upload a valid image file")
        } else {
          setError("Invalid file")
        }
        return
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        onImageChange(file)

        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageChange, maxSize],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    multiple: false,
  })

  const removeImage = () => {
    onImageChange(null)
    setPreview(null)
    setError(null)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <AnimatePresence mode="wait">
        {preview || currentImage ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25">
              <img
                src={preview || (currentImage ? URL.createObjectURL(currentImage) : "")}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
              isDragActive
                ? "border-primary bg-primary/5 scale-105"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
              error && "border-destructive bg-destructive/5",
            )}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-4"
            >
              {error ? (
                <AlertCircle className="w-12 h-12 text-destructive" />
              ) : isDragActive ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Upload className="w-12 h-12 text-primary" />
                </motion.div>
              ) : (
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              )}

              <div className="space-y-2">
                {error ? (
                  <p className="text-destructive font-medium">{error}</p>
                ) : (
                  <>
                    <p className="text-lg font-medium">{isDragActive ? "Drop your image here" : "Upload an image"}</p>
                    <p className="text-sm text-muted-foreground">Drag & drop or click to browse</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WebP up to {maxSize}MB</p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
