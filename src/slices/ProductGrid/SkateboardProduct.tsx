import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

import { createClient } from '@/prismicio';
import { FaStar } from 'react-icons/fa6';
import { ButtonLink } from '@/components/ButtonLink';

type Props = {
  id: string;
}

export async function SkateboardProduct({id}: Props) {
  const client = createClient();
  const product = await client.getByID<Content.SkateboardDocument>(id);

  const price = isFilled.number(product.data.price) 
  ? `$${(product.data.price / 100).toFixed(2)}` 
  : "Price Not Available";

  return (
    <div className="skateboard-product border-1 p-4">
      <div className="row">
        <span>
          {price}
        </span>
        <span>
          <FaStar className="text-yellow-400"/> 36
        </span>
      </div>
      <div className="product-image ~mb-1 py-4 overflow-hidden">
        <PrismicNextImage alt="" field={product.data.image} />
      </div>
      <h3 className="my-2 text-center">
        {product.data.name}
      </h3>
      <div className="text-center">
        <ButtonLink field={product.data.customizer_link}>Customize</ButtonLink>
      </div>
    </div>
  )
}