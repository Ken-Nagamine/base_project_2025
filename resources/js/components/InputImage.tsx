import { useState, useRef, ChangeEvent, MouseEvent } from 'react';

// 1. Defina a interface para as props do componente
interface FileInputCustomizadoTSProps {
  id: string;
  labelText?: string; 
  multiple?: boolean;
  tabIndex?: number;
  onFileSelect?: (file: File | null) => void;
}

// 2. Desestruture o 'id' das props
export default function InputImage({ 
    id, 
    labelText = 'Escolher Imagem', 
    onFileSelect,
    multiple = false,
    tabIndex,
}: FileInputCustomizadoTSProps) {
  const [nomeArquivo, setNomeArquivo] = useState<string>('Nenhuma imagem selecionada');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Se for múltiplo, mostra quantos arquivos foram selecionados
      if (multiple && files.length > 1) {
        setNomeArquivo(`${files.length} arquivos selecionados`);
      } else {
        setNomeArquivo(files[0].name);
      }
      // Passa o primeiro arquivo ou a FileList dependendo do seu onFileSelect
      onFileSelect?.(files[0]); // Ou onFileSelect?.(files) se o callback espera FileList
    } else {
      setNomeArquivo('Nenhuma imagem selecionada');
      onFileSelect?.(null);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="file"
        id={id}
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        tabIndex={tabIndex}
        multiple={multiple}
      />

      <button
        type="button"
        onClick={handleClick}
        className="
             inline-flex items-center justify-center
            px-4 py-2
            text-sm font-medium
            bg-white text-gray-900
            border border-gray-300 rounded-md
            shadow-sm
            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            data-[state=open]:bg-gray-100 // Exemplo de uso para estados como dropdown
            transition-colors duration-200 ease-in-out
        "
      >
        {labelText}
      </button>

      {/* texto do lado do botão */}
      {/* <span 
        className=" ml-4 text-sm text-gray-600 truncate max-w-xs">
        {nomeArquivo}
      </span> */}
    </div>
  );
}

