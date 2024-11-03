## modelo entidad relacion
![Logo](./images/53646fd1-b0be-4e63-8f2f-34e836f0952e.jpeg)

## graph QL 
![Logo](./images/612a217d-fc98-4a60-9caa-450b0e1893eb.jpeg)

## Interceptor
![Logo](./images/ddd508bd-2a30-43ec-9084-8f89f57c1487.jpeg)

## STEPS
- estos pasos deben ser ejecutados en orden
- tener en cuenta que todos son dispuestos desde la carpeta raiz

## Deploy infraestructure

```bash
$ cd infra 
$ docker-compose up -d
```

## Migration

```bash
$ cd migrations
$ npx sequelize-cli db:migrate --env development
```

## Run
```bash
$ cd test-rick-and-morty
$ npm install
$ npm run start:dev
```
