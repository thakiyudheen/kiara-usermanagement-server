import sequelize from "./config/db";
import server from "./server";



(async () => {
    try{
        server.start()
        const testConnection = async (): Promise<void> => {
            try {
              await sequelize.authenticate();
              await sequelize.sync();
              console.log('Connection has been established successfully.');
            } catch (error) {
              console.error('Unable to connect to the database:', error);
            }
          };
          
          testConnection();

    } catch ( error: any ){

        console.error(error?.message || 'An error occurred');
        process.exit(1);
    }
})();