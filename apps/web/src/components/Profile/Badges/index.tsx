import type { ProfileOnchainIdentity } from '@hey/lens';
import type { FC } from 'react';

import { HEY_API_URL, IS_MAINNET } from '@hey/data/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Ens from './Ens';
import HeyNft from './HeyNft';
import HeyProfile from './HeyProfile';
import ProofOfHumanity from './ProofOfHumanity';
import Sybil from './Sybil';
import Worldcoin from './Worldcoin';

interface BadgesProps {
  id: string;
  onchainIdentity: ProfileOnchainIdentity;
}

const Badges: FC<BadgesProps> = ({ id, onchainIdentity }) => {
  // Begin: Get isHeyProfile
  const getIsHeyProfile = async (): Promise<boolean> => {
    const response = await axios.get(`${HEY_API_URL}/badges/isHeyProfile`, {
      params: { id }
    });
    const { data } = response;

    return data?.isHeyProfile || false;
  };

  const { data: isHeyProfile } = useQuery({
    queryFn: getIsHeyProfile,
    queryKey: ['getIsHeyProfile', id]
  });
  // End: Get isHeyProfile

  // Begin: Check has Hey NFT
  const getHasHeyNft = async (): Promise<boolean> => {
    const response = await axios.get(`${HEY_API_URL}/badges/hasHeyNft`, {
      params: { id }
    });
    const { data } = response;

    return data?.hasHeyNft || false;
  };

  const { data: hasHeyNft } = useQuery({
    enabled: IS_MAINNET,
    queryFn: getHasHeyNft,
    queryKey: ['getHasHeyNft', id]
  });
  // End: Check has Hey NFT

  const hasOnChainIdentity =
    onchainIdentity?.proofOfHumanity ||
    onchainIdentity?.sybilDotOrg?.verified ||
    onchainIdentity?.ens?.name ||
    onchainIdentity?.worldcoin?.isHuman ||
    isHeyProfile ||
    hasHeyNft;

  if (!hasOnChainIdentity) {
    return null;
  }

  return (
    <>
      <div className="divider w-full" />
      <div className="flex flex-wrap gap-3">
        <ProofOfHumanity onchainIdentity={onchainIdentity} />
        <Ens onchainIdentity={onchainIdentity} />
        <Sybil onchainIdentity={onchainIdentity} />
        <Worldcoin onchainIdentity={onchainIdentity} />
        {isHeyProfile && <HeyProfile />}
        {hasHeyNft && <HeyNft />}
      </div>
    </>
  );
};

export default Badges;
