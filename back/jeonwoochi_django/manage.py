#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import py_eureka_client.eureka_client as eureka_client
import socket
from django.core.management.commands.runserver import Command as runserver
from contextlib import closing


# def find_free_port():
#     with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as s:
#         s.bind(('', 0))
#         s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
#         return s.getsockname()[1]
    
# free_port = find_free_port()

# try:
#     runserver.default_port = free_port

# except ConnectionRefusedError:
#     print('서버에 연결할 수 없습니다.')
#     print('1. 서버의 ip주소와 포트번호가 올바른지 확인하십시오.')
#     print('2. 서버 실행 여부를 확인하십시오.')
#     os._exit(1)


def eureka_init():
    # The flowing code will register your server to eureka server and also start to send heartbeat every 30 seconds
    eureka_client.init(
        # Eureka Server 所在的地址
        eureka_server="http://j7b305.p.ssafy.io:8761/eureka",
        app_name="RECOMM-SERVICE",
        instance_port= 8989,

    )
    
    print(eureka_client)
    


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jeonwoochi.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    # eureka_init()
    main()
