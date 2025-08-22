export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  description: string;
  category?: 'photo' | 'sketch' | 'artwork';
  date?: string;
  tags?: string[];
}

export interface GalleryData {
  photos: GalleryImage[];
  sketches: GalleryImage[];
}

export type GalleryImageType = 'photos' | 'sketches';
