#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
'''
from setuptools import setup, find_packages


project_name = 'project'

requirements = {
    'install': [
        'flask',
    ],

}

packages = find_packages()

setup(
    name=project_name,
    packages=[project_name],
    install_requires=requirements['install'],
)