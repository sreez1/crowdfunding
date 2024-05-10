import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const { contract } = useContract('0xd5FE5300D5191f0e9fA36a59bBBdF43Cbfef469f');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const address = useAddress();
    const connect = useMetamask();
    const publishCampaign = async (form) => {
        try {
          const data = await createCampaign({
                    args: [
                        address, // owner
                        form.title, // title
                        form.description, // description
                        form.target,
                        new Date(form.deadline).getTime(), // deadline,
                        form.image,
                    ],
                });
    
          console.log("contract call success", data)
        } catch (error) {
          console.log("contract call failure", error)
        }
      }

      const getCampaigns = async () => {
        const campaigns =  await contract.call('getCampaigns');
        const parsedCampaings = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
          }));
      
         return parsedCampaings;
      
        // console.log(parsedCampaings);
      }

      const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
    
        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    
        return filteredCampaigns;
      }



    
      return (
        <StateContext.Provider
          value={{ 
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            getCampaigns,
            getUserCampaigns
          }}
        >
          {children}
        </StateContext.Provider>
      )

}
export const useStateContext = () => useContext(StateContext);