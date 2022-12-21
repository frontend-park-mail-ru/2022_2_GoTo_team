server {
        listen 443 ssl;
        listen [::]:443 ssl;

        root ;
        index index.html;

        server_name ;

        access_log ;
        error_log ;

        ssl_certificate     ;
        ssl_certificate_key ;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers         HIGH:!aNULL:!MD5;

        location /api {
                proxy_pass https://gototeam.ru:8080;
                proxy_set_header Host $host;

                proxy_cache off;
        }

        location ~ ^(?!/api)/(.*) {
                alias ;
                try_files $1 $1/ /index.html;

                proxy_cache ve_ru_zone;
                proxy_cache_valid 200 5m;
                proxy_ignore_headers Set-Cookie;
                proxy_hide_header Set-Cookie;
        }
}