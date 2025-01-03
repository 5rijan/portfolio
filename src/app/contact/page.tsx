import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';

type SocialLink = {
  name: string;
  username: string;
  url: string;
};

const socialLinks: SocialLink[] = [
{ name: 'LinkedIn', username: '@5rijan', url: 'https://www.linkedin.com/in/5rijan/' },
  { name: 'GitHub', username: '@5rijan', url: 'https://github.com/5rijan' },
  { name: 'Read.cv', username: '@5rijan', url: 'https://read.cv/5rijan' },
  { name: 'Spotify', username: '@5rijan', url: 'https://open.spotify.com/user/9j7jnn489ppsttb3td4656h7u' },
  { name: 'Instagram', username: '@_5rijan', url: 'https://www.instagram.com/_5rijan/' }


];

export default function Contact() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-base font-semibold">Contact & Socials</h1>
      </div>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          {socialLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <div className="flex items-center justify-between py-3 group">
                <span className="text-sm text-muted-foreground">{link.name}</span>
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  {link.username}
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              {index < socialLinks.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}