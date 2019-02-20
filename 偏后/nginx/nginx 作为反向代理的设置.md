nginx 作为反向代理的设置

测试服配置:
<blockquote>
	
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
	include       mime.types;
	default_type  application/octet-stream;

	sendfile        on;
	keepalive_timeout  65;

	gzip  on;
	gzip_min_length 1k;
	gzip_buffers 4 16k;
	gzip_comp_level 9;
	gzip_types text/plain application/x-javascript application/javascript text/css text/javascript image/jpeg image/gif image/png;
	gzip_http_version 1.0;
	gzip_disable "MSIE [1-6]\.";
	gzip_vary on;

	server {
		listen       80;
		server_name  localhost;

		location / {
		    root   html;
		    index  index.html index.htm;
		}

		error_page   500 502 503 504  /50x.html;
		location = /50x.html {
		    root   html;
		}

	}


	server {
	    listen              5099;
	    server_name  	localhost;

	    #ssl on;
	    root /data/project/front/cmp/build;
	    index index.html;

	    location / {
		try_files $uri $uri/ /index.html;
	    }
	}

	server {
	    listen              5098;
	    server_name  	localhost;

	    #ssl on;
	    root /data/project/front/;
	    index /m/dist/index.html;

	    location / {
		try_files $uri $uri/ /m/dist/index.html;
	    }
	}

	server {
	    listen              5097;
	    server_name  	localhost;

	    #ssl on;
	    root /data/project/front/;
	    index /c/dist/index.html;

	    location / {
		try_files $uri $uri/ /c/dist/index.html;
	    }
	}

	server {
	    #server for shizhouyong, ajax addr is set to '10.0.0.4'
	    listen              5096;
	    server_name  	localhost;

	    #ssl on;
	    root /data/project/front/xiaookCmp/build;
	    index index.html;

	    location / {
		try_files $uri $uri/ /index.html;
	    }
	}

	server {
	    # server for test
	    listen              5095;
	    server_name  	localhost;

	    #ssl on;
	    root /data/project/front/cmp/build;
	    index index.html;

	    location / {
		try_files $uri $uri/ /index.html;
	    }
	}
	server {
	    # server for test
	    listen              5094;
	    server_name  	localhost;

	    #ssl on;
	    root /data/project/front/xlOfficial/build;
	    index index.html;

	    location / {
		try_files $uri $uri/ /index.html;
	    }
	}
}
</blockquote>

线上:
<blockquote>
	
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    gzip  on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 9;
    gzip_types text/plain application/x-javascript application/javascript text/css text/javascript image/jpeg image/gif image/png;
    gzip_http_version 1.0;
    gzip_disable "MSIE [1-6]\.";
    gzip_vary on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


server {
    listen              443;
    server_name c.api.xiaolian365.com;

    ssl on;
    ssl_certificate   cert/c.api.xiaolian365.com/214298514720086.pem;
    ssl_certificate_key  cert/c.api.xiaolian365.com/214298514720086.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
 
    location / {
        proxy_pass   http://localhost:5081/;
    }
}

server {
    listen              443;
    server_name m.api.xiaolian365.com;

    ssl on;
    ssl_certificate   cert/m.api.xiaolian365.com/214298511400086.pem;
    ssl_certificate_key  cert/m.api.xiaolian365.com/214298511400086.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
 
    location / {
        proxy_pass   http://localhost:5080/;
    }
}




server {
    listen              443;
    server_name  c.h5.xiaolian365.com;

    ssl on;
    ssl_certificate   cert/c.h5.xiaolian365.com/214298544160086.pem;
    ssl_certificate_key  cert/c.h5.xiaolian365.com/214298544160086.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    root /data/project/front/;
    index  index.html index.htm;
    location / {
        try_files $uri $uri/ /c/dist/index.html;  
    }
    

}


server {
    listen              443;
    server_name  m.h5.xiaolian365.com;

    ssl on;
    ssl_certificate   cert/m.h5.xiaolian365.com/214298481020086.pem;
    ssl_certificate_key  cert/m.h5.xiaolian365.com/214298481020086.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    root /data/project/front/;
    index  index.html index.htm;
    location / {
        try_files $uri $uri/ /m/dist/index.html;  
    }

}



server {
    listen              443;
    server_name  cmp.xiaolian365.com;

    ssl on;
    root /data/project/front/cmp/build;
    index index.html;
    ssl_certificate   cert/cmp.xiaolian365.com/214298251130086.pem;
    ssl_certificate_key  cert/cmp.xiaolian365.com/214298251130086.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ^~ /api/ {
        proxy_pass   http://localhost:5080/;
    }
}

server {
    listen              5099;
    server_name  	localhost;

    #ssl on;
    root /data/project/front/cmp/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen              5091;
    server_name  	localhost;

    #ssl on;
    root /data/project/front/cmp_fake/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}


server {
    listen              5098;
    server_name  	localhost;

    #ssl on;
    root /data/project/front/;
    index index.html;

    location / {
        try_files $uri $uri/ /m/dist/index.html;
    }
}

server {
    listen              5097;
    server_name  	localhost;

    #ssl on;
    root /data/project/front/;
    index index.html;

    location / {
        try_files $uri $uri/ /c/dist/index.html;
    }
}

server {
    #server for shizhouyong, ajax addr is set to '10.0.0.4'
    listen              5096;
    server_name  	localhost;

    #ssl on;
    root /data/project/front/cmp2/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    # server for test
    listen              5095;
    server_name  	localhost;

    #ssl on;
    root /data/project/front/cmp/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

	
server {
    # server for test
    listen              5094;
    server_name  	localhost;

    #ssl on;
    root /data/project/front/xlOfficial/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

}
</blockquote>