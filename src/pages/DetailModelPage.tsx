import { useParams } from 'react-router-dom';
import { useItemStore } from '@states/home';
import { useEffect } from 'react';
export function DetailModelPage() {
  const { itemData, getItemData } = useItemStore();
  useEffect(() => {
    getItemData();
  }, []);
  const params = useParams();
  const modelId = params.id;
  const model = itemData.find((item) => item.id.toString() === modelId);
  return <div>{model?.name}</div>;
}
