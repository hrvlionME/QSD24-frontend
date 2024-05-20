import React from 'react';
import ChatBot from 'react-simple-chatbot';

interface ChatData {
  gender: string;
  category: string;
  price: number;
}

const steps = [
  {
    id: '1',
    message: "Hi, it's great to see you today!",
    trigger: '2',
  },
  {
    id: '2',
    message: "Could you kindly indicate whether you are a man, woman, or child, so we can suggest the best products for you?",
    trigger: '3',
  },
  {
    id: '3',
    options: [
      { value: 'man', label: 'Man', trigger: '4', metadata: { gender: 'man' } },
      { value: 'woman', label: 'Woman', trigger: '4', metadata: { gender: 'woman' } },
      { value: 'child', label: 'Child', trigger: '4', metadata: { gender: 'child' } },
    ]
  },
  {
    id: '4',
    message: "What category of products are you looking to buy?",
    trigger: '5',
  },
  {
    id: '5',
    options: [
      { value: 'shirts', label: 'Shirts', trigger: '6', metadata: { category: 'shirts' } },
      { value: 'pants', label: 'Pants', trigger: '6', metadata: { category: 'pants' } },
      { value: 'dresses', label: 'Dresses', trigger: '6', metadata: { category: 'dresses' } },
      { value: 'jackets and coats', label: 'Jackets and Coats', trigger: '6', metadata: { category: 'jackets and coats' } },
      { value: 'skirts', label: 'Skirts', trigger: '6', metadata: { category: 'skirts' } },
      { value: 'jumpsuits', label: 'Jumpsuits', trigger: '6', metadata: { category: 'jumpsuits' } },
      { value: 'underwear and pajamas', label: 'Underwear and Pajamas', trigger: '6', metadata: { category: 'underwear and pajamas' } },
      { value: 'Activewear', label: 'Activewear', trigger: '6', metadata: { category: 'activewear' } },
    ]
  },
  {
    id: '6',
    message: "What is the maximum price you are willing to pay?",
    trigger: '7',
  },
  {
    id: '7',
    user: true,
    trigger: '8',
    validator: (value: string) => {
      const price = parseFloat(value);
      return isNaN(price) ? 'Please enter a valid number' : true;
    },
    metadata: { price: undefined } 
  },
  {
    id: '8',
    message: "Great, now I will show you the products that suit you the best!",
    end: true,
  },
];

const handleCollect = (data: ChatData) => {
  console.log('Collected data:', data);
};

const ChatComponent: React.FC = () => (
  <ChatBot steps={steps} floating  handleEnd={handleCollect}/>
);

export default ChatComponent;