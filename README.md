# NodePop

Deploy: 

```sh
npm install 
``` 

Load initial data to database: 

```sh
npm run init-db
``` 

Start the application in production with: 

```sh
npm start
``` 

Start the application in development with: 

```sh
npm run dev
``` 

## API Documentation

Advertisement list: 

GET /api/advertisements

```javascript
{
    "ads": [
        {
            "name": "Classic bicycle",
            "forSale": true,
            "price": 230.50,
            "image": "bicycle.jpg",
            "tags": [ "lifestyle", "motor"]
        },
        {
            "name": "iPhone 14",
            "forSale": false,
            "price": 850.00,
            "image": "iphone14.jpg",
            "tags": [ "lifestyle", "mobile"]
        },
        {
            "name": "Gaming chair",
            "forSale": true,
            "price": 110.00,
            "image": "gaming-chair.jpg",
            "tags": [ "lifestyle", "work"]
        }
    ]
}
```

Search examples: 
- Get ads by name: http://localhost:3000/api/advertisements?name=gaming

- Get ads by type: http://localhost:3000/api/advertisements?forSale=true

- Get ads by price: http://localhost:3000/api/advertisements?price=230.5    (OR    ?price=110.00   |   ?price=200-700   |   ?price=300-   |   ?price=-300) 

- Get ads by tag: http://localhost:3000/api/advertisements?tags=motor

- Pagination: http://localhost:3000/api/advertisements?skip=2&limit=1

- Field selection: http://localhost:3000/api/advertisements?fields=name

- Sort examples: http://localhost:3000/api/advertisements?sort=price

- Get all existing tags: http://localhost:3000/api/advertisements/tags

- Create new advertisement: http://localhost:3000/api/advertisements (body=adData)

- Get images: http://localhost:3000/images/gaming-chair.jpg