'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_TEAM, subscribeTeam, TeamMember } from '@/lib/firestore-team';
import { useSiteMedia } from '@/components/SiteMediaProvider';
import { resolveMediaUrl } from '@/lib/site-media';

export default function TeamGrid() {
  const [members, setMembers] = useState<TeamMember[]>(DEFAULT_TEAM);
  const media = useSiteMedia();
  useEffect(() => subscribeTeam(setMembers), []);

  return (
    <div className="team-grid">
      {members.filter((m) => m.visible).map((member) => {
        const image = member.image.startsWith('/images/') ? resolveMediaUrl(media, member.image) : member.image;
        return (
          <div className="team-card reveal in" key={member.id}>
            <img src={image} alt={member.name ? `${member.name}, ${member.role}` : member.role} loading="lazy" />
            <b>{member.name || member.role}</b>
            <span>{member.name ? member.role : member.bio}</span>
            {member.name && member.bio ? <small>{member.bio}</small> : null}
          </div>
        );
      })}
    </div>
  );
}
