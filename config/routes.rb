Rails.application.routes.draw do
  root 'static_pages#home'

  get 'about' => 'static_pages#about'

  get 'donate', to: 'donations#new', as: :donations_new
  post 'donate', to: 'donations#create', as: :donations_create

  get 'receive', to: 'recipients#new', as: :recipients_new
  post 'receive', to: 'recipients#create', as: :recipients_create

  scope '/coordinator' do
    get '/deliver', to: 'coordinator#deliver', as: :coordinator_deliver
    post '/deliver', to: 'coordinator#confirm', as: :coordinator_confirm
    get '/schedule', to: 'coordinator#schedule', as: :coordinator_schedule
    post '/schedule', to: 'coordinator#match', as: :coordinator_match
    get '/data', to: 'coordinator#data', as: :coordinator_data
  end

  scope '/donor' do
    get '/profile', to: 'donor#profile', as: :donor_profile
  end
  get 'recipient_profile', to: 'recipient_profiles#show', as: :recipient_profile

  get 'interest/create/:authentication/:recipient_id/:donation_id', to: 'create_interest#create'

  devise_for :users

  get "unsubscribe" => "api#unsubscribe"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products
  resources :users

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
