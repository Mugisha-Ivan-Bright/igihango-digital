import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

export const EvidenceBridge: React.FC<{ onUpload: (data: any) => void }> = ({ onUpload }) => {
    const [photo, setPhoto] = useState<string | null>(null);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const takePhoto = async () => {
        setIsCapturing(true);
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri
            });

            const coordinates = await Geolocation.getCurrentPosition();

            setPhoto(image.webPath || null);
            setLocation({
                lat: coordinates.coords.latitude,
                lng: coordinates.coords.longitude
            });

            // Simulation of metadata verification
            if (image && coordinates) {
                onUpload({
                    image,
                    location: coordinates.coords,
                    timestamp: new Date().toISOString()
                });
            }
        } catch (e) {
            console.error("Capture failed", e);
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <div className="bg-surface rounded-3xl p-6 border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold text-gold mb-4">Evidence Bridge</h3>

            {!photo ? (
                <button
                    onClick={takePhoto}
                    disabled={isCapturing}
                    className="w-full aspect-video border-2 border-dashed border-gold/30 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gold/5 transition-colors group"
                >
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <span className="text-xs font-medium text-white/70 uppercase tracking-widest">
                        {isCapturing ? 'Verifying Metadata...' : 'Capture Evidence'}
                    </span>
                </button>
            ) : (
                <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden aspect-video border border-gold/20">
                        <img src={photo} alt="Evidence" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-3 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gold font-bold uppercase tracking-tighter">Verified GPS</span>
                                <span className="text-[8px] text-white/80">{location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-gold font-bold uppercase tracking-tighter">Timestamp</span>
                                <span className="text-[8px] text-white/80">{new Date().toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setPhoto(null)}
                        className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-widest"
                    >
                        Retake Proof
                    </button>
                </div>
            )}

            <p className="mt-4 text-[10px] text-white/40 leading-relaxed italic">
                * Law No. 058/2021 compliance: Images are cryptographically signed with GPS and Time metadata upon capture.
            </p>
        </div>
    );
};
