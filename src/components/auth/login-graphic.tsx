import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function LoginGraphic() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-background');

  if (!bgImage) {
    return (
        <div className="relative h-full w-full overflow-hidden bg-muted">
            <p>Imagen no encontrada</p>
        </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={bgImage.imageUrl}
        alt={bgImage.description}
        fill
        priority
        className="object-cover"
        data-ai-hint={bgImage.imageHint}
      />
      <div className="absolute inset-0 bg-background/50" />
    </div>
  );
}
