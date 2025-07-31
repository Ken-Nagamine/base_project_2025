# BASE PROJECT 

## LARAVEL 12 + REACT 19 (typescript / tailwinds / shadcn/ui)


### COMMANDS

* composer run dev (run local)


### AUTHENTICATION

* LOGIN (admin / default)

* TABLE -> ADMIN: admins / DEFAULT: users


### FRONT PACKAGES

* npm install @radix-ui/themes (radix theme )

* npm install radix-ui  ( radix primitives )

npx shadcn@latest add alert-dialog

* forgot-password

* component input (css)

URL: para testar

- http://localhost:8000/forgot-password -> auth/user-forgot-password
- http://localhost:8000/reset-password -> auth/user-reset-password
- http://localhost:8000/verify-email -> auth/user-verify-email -> UserEmailVerificationPromptController....


## CRUD EXAMPLE

*** IMAGEM -> php artisan storage:link
  - storage/app/public/images -> local onde as imagens são guardadas

  - OBS: em public/storage/images... são ""links simbólicos" e não deleta ao deletar uma imagem.

### Banner
** Exemplo de um CRUD que usa nova pagina de formulario, e as consultas da tabela e paginação envolve o Back.

*** BACK
* Table banners -> php artisan make:model Banner
* Migrations -> php artisan make:migration create_banners_table
* controller -> php artisan make:controller BannerController --resource   ( --resource -> ja vem com metodos get/post/put e delete)
* route Route::resources([ 'banners' => BannerController::class ]);

***FRONT
* Page -> resources/js/pages/admin/banners (criar pasta com nome do modelo)
* paginas:
  - banners -> lista de banners cadastrados
  - create-banner -> formulario de criação
  - edit-banner -> formulario de edição
  - show-banner -> mostra os dados completo do modelo (pagina opcional)


### Category
** Exemplo de um CRUD que usa o Dialog (modal) de formulario, e as consultas da tabela e paginação fica no front.

*** BACK
igual banners...

*** FRONT 
 - utilizando modal (Dialog) para CRUD  ( insere dialog no final da pagina)
 ** somente modifica as paginas de:
     - create-category para create-category-dialog (modal)
     - edit-category para edit-category-dialog (modal)
     - show-category para show-category-dialog (modal)


### Product
** exemplo mais complexo.....