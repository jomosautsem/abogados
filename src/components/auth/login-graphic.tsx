import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function LoginGraphic() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-background');

  if (!bgImage) {
    return (
        <div className="absolute inset-0 w-full h-full bg-muted" />
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={bgImage.imageUrl}
        alt={bgImage.description}
        fill
        priority
        className="object-cover"
        data-ai-hint={bgImage.imageHint}
      />
    </div>
  );
}
