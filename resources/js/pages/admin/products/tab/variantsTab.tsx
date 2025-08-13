import { FormEvent } from 'react';
import { ProductFormData, ProductVariant, VariationOption } from '@/types/index';

import InputError from '@/components/InputError';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface VariantsTabProps {
    data: ProductFormData;
    setData: (name: keyof ProductFormData, value: ProductFormData[keyof ProductFormData]) => void;
    errors: Partial<Record<keyof ProductFormData, string>>;
}

export default function VariantsTab({ data, setData, errors }: VariantsTabProps) {
    const handleAddVariant = () => {
        const newVariant: ProductVariant = {
            sku: '',
            price: 0,
            stock: 0,
            options: [
                { option_name: '', option_value: '' }, // Começa com uma opção vazia
            ],
        };
        setData('variants', [...data.variants, newVariant]);
    };

    const handleRemoveVariant = (index: number) => {
        const newVariants = data.variants.filter((_, i) => i !== index);
        setData('variants', newVariants);
    };

    // Adiciona uma nova opção a uma variante específica
    const handleAddOption = (variantIndex: number) => {
        const newVariants = [...data.variants];
        const newOption: VariationOption = {
            option_name: '',
            option_value: '',
        };
        newVariants[variantIndex].options.push(newOption);
        setData('variants', newVariants as any);
    };

    // Remove uma opção de uma variante específica
    const handleRemoveOption = (variantIndex: number, optionIndex: number) => {
        const newVariants = [...data.variants];
        newVariants[variantIndex].options = newVariants[variantIndex].options.filter((_, i) => i !== optionIndex);
        setData('variants', newVariants as any);
    };

     // Lida com a mudança nos campos principais da variante (SKU, preço, estoque)
    const handleVariantChange = (variantIndex: number, field: keyof ProductVariant, value: string | number) => {
        const newVariants = [...data.variants];
        // TS verifica se 'field' é uma chave válida de ProductVariant
        (newVariants[variantIndex][field] as string | number) = value;
        setData('variants', newVariants);
    };

    // Lida com a mudança nos campos de opção (nome e valor)
    const handleOptionChange = (variantIndex: number, optionIndex: number, field: keyof ProductVariant['options'][number], value: string) => {
        const newVariants = [...data.variants];
        newVariants[variantIndex].options[optionIndex][field] = value;
        setData('variants', newVariants);
    };

    return (
        <div>
            {data.variants.map((variant, variantIndex) => (
                <div key={variantIndex} className="p-4 border rounded-md mb-4 relative">
                    <h4 className="font-semibold text-lg mb-4">Variante #{variantIndex + 1}</h4>
                    
                    {data.variants.length > 1 && (
                        <button type="button" onClick={() => handleRemoveVariant(variantIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">Remover</button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor={`sku-${variantIndex}`}>SKU</Label>
                            <Input
                                id={`sku-${variantIndex}`}
                                value={variant.sku}
                                onChange={(e: FormEvent<HTMLInputElement>) => handleVariantChange(variantIndex, 'sku', e.currentTarget.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors[`variants.${variantIndex}.sku`]} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor={`price-${variantIndex}`} >Preço</Label>
                            <Input
                                id={`price-${variantIndex}`}
                                type="number"
                                step="0.01"
                                value={variant.price}
                                onChange={(e: FormEvent<HTMLInputElement>) => handleVariantChange(variantIndex, 'price', parseFloat(e.currentTarget.value))}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors[`variants.${variantIndex}.price`]} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor={`price-${variantIndex}`} >Estoque</Label>
                            <Input
                                id={`stock-${variantIndex}`}
                                type="number"
                                // step="0.01"
                                value={variant.stock}
                                onChange={(e: FormEvent<HTMLInputElement>) => handleVariantChange(variantIndex, 'stock', parseFloat(e.currentTarget.value))}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors[`variants.${variantIndex}.stock`]} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <h5 className="font-medium text-gray-700 mb-2">Opções da Variante</h5>
                        {variant.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 relative">
                                <div>
                                    <Label htmlFor={`option-name-${variantIndex}-${optionIndex}`} >Nome da Variação (ex: Cor)</Label>
                                    <Input
                                        id={`option-name-${variantIndex}-${optionIndex}`}
                                        value={option.option_name}
                                        onChange={(e: FormEvent<HTMLInputElement>) => handleOptionChange(variantIndex, optionIndex, 'option_name', e.currentTarget.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors[`variants.${variantIndex}.options.${optionIndex}.option_name`]} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor={`option-value-${variantIndex}-${optionIndex}`} >Valor da Opção (ex: Preto)</Label>
                                    <Input
                                        id={`option-value-${variantIndex}-${optionIndex}`}
                                        value={option.option_value}
                                        onChange={(e: FormEvent<HTMLInputElement>) => handleOptionChange(variantIndex, optionIndex, 'option_value', e.currentTarget.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors[`variants.${variantIndex}.options.${optionIndex}.option_value`]} className="mt-2" />
                                </div>
                                {variant.options.length > 1 && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveOption(variantIndex, optionIndex)}
                                                className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                            >
                                                &times;
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent sideOffset={5}>
                                            <p>Exclui a variante!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() => handleAddOption(variantIndex)}
                            className="mt-2 px-3 py-1 text-sm text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
                        >
                            + Adicionar Opção
                        </Button>
                    </div>

                </div>
            ))}
            
            <Button type="button" onClick={handleAddVariant} className="cursor-pointer">+ Adicionar Variante</Button>
        </div>
    );
}