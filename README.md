# Facebook-Authentication

### STEP 1: Clone git repository
    git clone https://github.com/Dr-Magus/Facebook-Authentication.git
    
### STEP 2: Install dependencies

1. Create virtual enviornment  

    > python -m venv [env_name]
    
2. Activate virtual enviornment

    > Window: [env_name]\Scripts\activate  
    >  
    > Linux: source [env_name]/bin/activate
    
3. Install python dependencies

    > cd ./Facebook-Authentication  
    >  
    > pip install -r requirements.txt  
    
4. Install reactJS dependencies

    > cd ./frontend  
    >  
    > npm install --force
    
### STEP 3: Run server

1. Run django/python server
  
    > Now change the directory to 'Authentication' and run 'python manage.py runserver' in terminal
    
2. Run the frontend server

    > Change the directory to 'frontend' and run 'npm run start' in terminal
