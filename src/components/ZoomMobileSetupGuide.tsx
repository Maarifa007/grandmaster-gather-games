
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Monitor, Camera, Share } from 'lucide-react';

interface ZoomMobileSetupGuideProps {
  trigger?: React.ReactNode;
}

const ZoomMobileSetupGuide = ({ trigger }: ZoomMobileSetupGuideProps) => {
  const defaultTrigger = (
    <Button variant="outline" size="sm">
      📱 Mobile Setup Guide
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            🏆 GSCI Tournament Rules - Zoom + Tornelo Setup Guide
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Mobile Setup */}
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">📱 Mobile Setup (Phone/Tablet)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <p>Join Zoom on your phone via the mobile app</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <p>Tap <strong>Share → Screen → Start Broadcast</strong></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <p>Your Tornelo game screen will be visible to arbiters</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <p>Your camera stays on in a floating overlay window</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                  <p><strong>⚠️ Keep your camera overlay unobstructed!</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Desktop Setup */}
          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Monitor className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">💻 Desktop Setup (Laptop/Computer)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <p>Join Zoom via desktop app (required for screen sharing)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <p>Turn on your webcam and microphone</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <p>Share your full screen (not just browser window)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <p>Keep your face, desk, and game visible at all times</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                  <p><strong>⚠️ Avoid hiding or minimizing Zoom during the game</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fair Play Rules */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-6 w-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-800">⚖️ Fair Play Requirements</h3>
              </div>
              <div className="space-y-2">
                <p className="text-amber-800">
                  <strong>✅ Required:</strong> Camera ON, screen sharing active, visible at all times
                </p>
                <p className="text-amber-800">
                  <strong>❌ Prohibited:</strong> Chess engines, outside help, multiple tabs, reference materials
                </p>
                <p className="text-amber-800">
                  <strong>⚠️ Warning:</strong> Failure to comply may result in forfeiture or removal
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Share className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800">💡 Pro Tips for Mobile Players</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Use a phone stand or prop for stable camera positioning</li>
                <li>• Ensure good lighting on your face and playing area</li>
                <li>• Test screen sharing before the tournament starts</li>
                <li>• Keep your camera overlay pinned and visible</li>
                <li>• Have a backup plan (charger, stable WiFi)</li>
                <li>• Join 10 minutes early for tech check</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomMobileSetupGuide;
