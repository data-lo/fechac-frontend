Configuración


Archivo .env

darle permisos de ejecución al script (Linux/MacOs)


agregarlo al cron  a la carpeta de scripts; y darle permisos de ejecucion:


mkdir -p ~/scripts
mv /Users/isaaysosa/Desktop/GIT_HUB/fechac-frontend/cron-job.sh (ruta actual) ~/scripts/
chmod +x ~/scripts/cron-job.sh

crontab e-
pegar esto
* * * * * /Users/isaaysosa/scripts/cron-job.sh >> /Users/isaaysosa/scripts/cron.log 2>&1


salir de editor

ESC
:wq

verificar que todo este en orden crontab -l
