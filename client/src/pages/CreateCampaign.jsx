import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ethers} from "ethers";
import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader} from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  // make it async since smart contract tx cost time
  const handleSubmit = async (e) => {
    // the default browser behaviour is to refresh the page after
    // form submission but we dont want to do that
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
    console.log(form);

  }
  return (
    <div className="bg-[#B3E5FC] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
    {isLoading && <Loader/>}
    <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#00BCD4] rounded-[10px] ">
      <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-black ">Start a Campaign</h1>
    </div>
    <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]  pb-[5rem]">
    <div className="flex flex-wrap gap-[40px]">
      <FormField
      labelName="Your Name *"
      placeholder="Name"
      inputType="text"
      value={form.name}
      handleChange={(e) => handleFormFieldChange('name', e)}
      />

      <FormField
        labelName="Campaign Title *"
        placeholder="Write a title"
        inputType="text"
        value={form.title}
        handleChange={(e) => handleFormFieldChange('title', e)}
      />

      </div>
      <FormField
        isTextArea
        labelName="Story *"
        placeholder="Write your story"
        inputType="text"
        value={form.description}
        handleChange={(e) => handleFormFieldChange('description', e)}
      />
      {/* <div className="w-full flex justify-start items-center p-4 bg-[#00BCD4] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-black ml-[20px]">You will get 100% of the raised amount</h4>
      </div> */}
      <div className="flex flex-wrap gap-[40px]">
      <FormField
      labelName="Goal *"
      placeholder="ETH 0.50"
      inputType="text"
      value={form.target}
      handleChange={(e) => handleFormFieldChange('target', e)}
      />

      <FormField
        labelName="End Date *"
        placeholder="End Date"
        inputType="date"
        value={form.deadline}
        handleChange={(e) => handleFormFieldChange('deadline', e)}
      />

      </div>
      <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
      />
      <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#00BCD4]"
            />
          </div>
    </form>

    </div>
  )
}

export default CreateCampaign
