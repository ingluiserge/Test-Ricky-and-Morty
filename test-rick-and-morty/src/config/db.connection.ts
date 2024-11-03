type DbConnection = {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
	dbLogging: boolean;
};

const connection: DbConnection = {
	host: process.env.DB_HOST ?? 'localhost',
	port: Number(process.env.DB_PORT) ?? 5432,
	user: process.env.DB_USER ?? 'rick',
	password: process.env.DB_PASSWORD ?? 'morty',
	database: process.env.DB_NAME ?? 'rick-and-morty',
	dbLogging: false
		// (process.env.NODE_ENV ?? 'development') === 'development' || 
		// process.env.LOG === 'true',
};

export default connection;