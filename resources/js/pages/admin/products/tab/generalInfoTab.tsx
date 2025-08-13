import { usePage } from '@inertiajs/react';
import { ProductFormData } from '@/types';

import InputError from '@/components/InputError';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface GeneralInfoTabProps {
    data: ProductFormData;
    setData: (name: keyof ProductFormData, value: ProductFormData[keyof ProductFormData]) => void;
    errors: Partial<Record<keyof ProductFormData, string>>;
    processing: boolean;
}

interface Category {
    id: number;
    name: string;
}

interface Brand {
    id: number,
    name: string
};

interface ProductCreateProps {
  brands: Brand[];
  categories: Category[];
  [key: string]: any;
}

export default function GeneralInfoTab({ data, setData, errors, processing }: GeneralInfoTabProps) {
    const { brands, categories } = usePage<ProductCreateProps>().props;

    return (
        <div className='grid gap-6'>
            <div className="grid gap-2">
                <Label htmlFor="name">Nome do produto</Label>
                <Input
                    id="name"
                    type="text"
                    autoFocus
                    tabIndex={1}
                    autoComplete='name'
                    value={data.name ?? ''}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Nome produto"
                    required
                    disabled={processing}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="slug">Slug produto</Label>
                <Input
                    id="slug"
                    type="text"
                    tabIndex={1}
                    autoComplete='slug'
                    value={data.slug ?? ''}
                    onChange={(e) => setData('slug', e.target.value)}
                    placeholder="Slug produto"
                    required
                    disabled={processing}
                />
                <InputError message={errors.slug} className="mt-2" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                    id="description"
                    value={data.description ?? ''}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Descrição do produto"
                    disabled={processing}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className='flex w-full gap-5'>
                <div className="grid gap-2 w-1/2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select value={String(data.brand_id)} onValueChange={(value: string) => setData('brand_id', value)} name="brand_id">
                        <SelectTrigger id="brand" disabled={processing}>
                            <SelectValue placeholder="Select a brand…"  />
                        </SelectTrigger>
                        <SelectContent>
                            {brands?.map((brand: any) => (
                                <SelectItem key={brand.id} value={String(brand.id)}>{brand.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>             
                    <InputError message={errors.brand_id} />
                </div>

                <div className="grid gap-2 w-1/2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={String(data.category_id)} onValueChange={(value: string) => setData('category_id', value)} name="category_id">
                        <SelectTrigger id="category" disabled={processing}>
                            <SelectValue placeholder="Select a category…"  />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((category: any) => (
                                <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>  
                    <InputError message={errors.category_id} className="mt-2" />
                </div>
            </div>

            <div className='flex w-full gap-5'>
                <div className="grid gap-2 w-1/4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                        id="height"
                        type="text"
                        tabIndex={1}
                        autoComplete='height'
                        value={data.height ?? ''}
                        onChange={(e) => setData('height', e.target.value)}
                        disabled={processing}
                        placeholder="Product height"
                    />
                    <InputError message={errors.height} className="mt-2" />
                </div>

                 <div className="grid gap-2 w-1/4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                        id="width"
                        type="text"
                        tabIndex={1}
                        autoComplete='width'
                        value={data.width ?? ''}
                        onChange={(e) => setData('width', e.target.value)}
                        disabled={processing}
                        placeholder="Product width"
                    />
                    <InputError message={errors.width} className="mt-2" />
                </div>

                 <div className="grid gap-2 w-1/4">
                    <Label htmlFor="length">Length</Label>
                    <Input
                        id="length"
                        type="text"
                        tabIndex={1}
                        autoComplete='length'
                        value={data.length ?? ''}
                        onChange={(e) => setData('length', e.target.value)}
                        disabled={processing}
                        placeholder="Product Length"
                    />
                    <InputError message={errors.length} className="mt-2" />
                </div>

                 <div className="grid gap-2 w-1/4">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                        id="weight"
                        type="text"
                        tabIndex={1}
                        autoComplete='weight'
                        value={data.weight ?? ''}
                        onChange={(e) => setData('weight', e.target.value)}
                        disabled={processing}
                        placeholder="Product weight"
                    />
                    <InputError message={errors.weight} className="mt-2" />
                </div>

            </div>

            <div className="grid gap-2">
                <Label htmlFor="product_tags">Tags</Label>
                <Input
                    id="product_tags"
                    type="text"
                    tabIndex={1}
                    autoComplete='product_tags'
                    value={data.product_tags ?? ''}
                    onChange={(e) => setData('product_tags', e.target.value)}
                    disabled={processing}
                    placeholder="Tags"
                />
                <InputError message={errors.product_tags} className="mt-2" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="meta_title">Meta title</Label>
                <Input
                    id="meta_title"
                    type="text"
                    tabIndex={1}
                    autoComplete='meta_title'
                    value={data.meta_title ?? ''}
                    onChange={(e) => setData('meta_title', e.target.value)}
                    disabled={processing}
                    placeholder="Meta Title para SEO"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="meta_description">Meta description</Label>
                <Input
                    id="meta_description"
                    type="text"
                    tabIndex={1}
                    autoComplete='meta_description'
                    value={data.meta_description ?? ''} 
                    onChange={(e) => setData('meta_description', e.target.value)}
                    disabled={processing}
                    placeholder="Meta Description para SEO"
                />
                <InputError message={errors.meta_description} className="mt-2" />
            </div>
        </div>
    );
}