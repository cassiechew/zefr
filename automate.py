#!/usr/bin/python

import sys
import os

models_block = """%: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true
    },"""

routes_block = """%: req.body.%,\n"""


def main():

    language = sys.argv[1]
    name_of_api = sys.argv[2]
    
    routes_file = open("./sources/routes." + language , "r")
    models_file = open("./sources/models." + language, "r")

    routes_file_out = open("./" + name_of_api + "." + language, "w")
    models_file_out = open("./" + name_of_api + "Model." + language, "w")

    data = sys.argv[3:]

    models_data_array = []
    routes_data_array = []

    process_data_array (data, models_data_array, False)
    process_data_array (data, routes_data_array, True)

    writeout (models_file, False, models_data_array, name_of_api, models_file_out)
    writeout (routes_file, True, routes_data_array, name_of_api, routes_file_out)

    models_file_out.close()
    routes_file_out.close()
    routes_file.close()
    models_file.close()


def process_data_array(data, data_array, rORm):
    for s in data:
        new_block = routes_block.replace("%", s) if rORm else models_block.replace("%", s)
        data_array.append(new_block)


def writeout (OGfile, rORm, data_array, name, outFile):
    for line in OGfile:
        if "%" in line:
            line = routes_data_processing(data_array) if rORm else models_data_processing(data_array)

        if "&" in line:
            line =  line.replace("&", name)

        if "*" in line:
            line =  line.replace("*", name.capitalize())

        outFile.write(line)


def routes_data_processing(routes_data_array):
    output = ""

    for o in routes_data_array:
        output += o
    output+= "\n"
    return output


def models_data_processing(models_data_array):
    output = ""

    for o in models_data_array:
        output += o
    output+= "\n"

    return output

if __name__ == "__main__":
    main()