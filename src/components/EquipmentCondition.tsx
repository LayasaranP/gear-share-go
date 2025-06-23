
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Check, AlertCircle, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EquipmentConditionProps {
  equipmentName: string;
  phase: 'pickup' | 'return';
  onSubmit: (data: ConditionData) => void;
  referenceImages?: string[];
}

interface ConditionData {
  photos: File[];
  notes: string;
  checklist: Record<string, boolean>;
  overallCondition: 'excellent' | 'good' | 'fair' | 'poor';
}

const EquipmentCondition: React.FC<EquipmentConditionProps> = ({
  equipmentName,
  phase,
  onSubmit,
  referenceImages = []
}) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [overallCondition, setOverallCondition] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const inspectionPoints = [
    'Overall cleanliness',
    'No visible damage or wear',
    'All parts/accessories present',
    'Proper working condition',
    'Safety features functional',
    'Documentation/manuals included'
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos(prev => [...prev, ...files]);
  };

  const handleCameraCapture = () => {
    // In a real app, this would open camera interface
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      setPhotos(prev => [...prev, ...files]);
    };
    input.click();
  };

  const handleChecklistChange = (point: string, checked: boolean) => {
    setChecklist(prev => ({ ...prev, [point]: checked }));
  };

  const handleSubmit = async () => {
    if (photos.length === 0) {
      toast({
        title: "Photos required",
        description: "Please upload at least one photo to document the equipment condition.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        photos,
        notes,
        checklist,
        overallCondition
      });
      
      toast({
        title: "Condition documented",
        description: `Equipment condition for ${phase} has been successfully recorded.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit condition documentation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Equipment Condition - {phase === 'pickup' ? 'Pickup' : 'Return'}
        </h2>
        <p className="text-gray-600">{equipmentName}</p>
        <Badge variant={phase === 'pickup' ? 'default' : 'secondary'} className="mt-2">
          {phase === 'pickup' ? 'Pre-Rental Documentation' : 'Post-Rental Documentation'}
        </Badge>
      </div>

      {/* Reference Images */}
      {referenceImages.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileImage className="w-5 h-5" />
            Reference Images (Original Condition)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {referenceImages.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={image} alt={`Reference ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Photo Upload */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Current Condition Photos
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={URL.createObjectURL(photo)} 
                alt={`Condition ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleCameraCapture} variant="outline" className="flex-1">
            <Camera className="w-4 h-4 mr-2" />
            Take Photo
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <label className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photos
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </Button>
        </div>
      </Card>

      {/* Inspection Checklist */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Inspection Checklist</h3>
        <div className="space-y-3">
          {inspectionPoints.map((point) => (
            <div key={point} className="flex items-center space-x-3">
              <Checkbox
                id={point}
                checked={checklist[point] || false}
                onCheckedChange={(checked) => handleChecklistChange(point, checked as boolean)}
              />
              <label htmlFor={point} className="text-sm font-medium">
                {point}
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Overall Condition */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Overall Condition</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['excellent', 'good', 'fair', 'poor'] as const).map((condition) => (
            <button
              key={condition}
              onClick={() => setOverallCondition(condition)}
              className={`p-3 rounded-lg border-2 text-center transition-colors ${
                overallCondition === condition
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="capitalize font-medium">{condition}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Document any specific observations, damage, or concerns..."
          className="min-h-[100px]"
        />
      </Card>

      {/* Submit */}
      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || photos.length === 0}
          className="flex-1"
        >
          {isSubmitting ? 'Submitting...' : `Confirm ${phase === 'pickup' ? 'Pickup' : 'Return'} Condition`}
        </Button>
      </div>
    </div>
  );
};

export default EquipmentCondition;
