from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in novelite/__init__.py
from novelite import __version__ as version

setup(
	name="novelite",
	version=version,
	description="App for Novel",
	author="Ragul KM",
	author_email="ragul.k@noveloffice.in",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
