import io, csv
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import FileUploadSerializer

import pandas as pd

# Create your views here.

class FileUploadView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, filename, format=None):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SplitByType(APIView):

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        
        file = request.data.get('file')
        decoded_file = file.read().decode()
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)
    
        df = pd.DataFrame(reader)
        _, paid = [x for _, x in df.groupby(df['Type'] == 'Paid')]
        _, free = [x for _, x in df.groupby(df['Type'] == 'Free')]

        path_free = 'media/uploads/free.csv'
        path_paid = 'media/uploads/paid.csv'
        free.to_csv(path_free)
        paid.to_csv(path_paid)

        data = [
            {"name": 'free', 'url': path_free},
            {"name": 'paid', 'url': path_paid},
        ]

        return Response(data, status=status.HTTP_200_OK) 

class SplitByContentRating(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        
        file = request.data.get('file')
        decoded_file = file.read().decode()
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)
    
        df = pd.DataFrame(reader)
        contentRating = {value: df[df['Content Rating'] == value] for value in df['Content Rating'].unique()}

        data = []
        for key, value in contentRating.items():
            if not key:
                key = 'Unknown'

            path = f'media/uploads/{key}.csv'
            value.to_csv(path)
            temp = {}
            temp['name'] = key
            temp['url'] = path
            data.append(temp)

        return Response(data, status=status.HTTP_200_OK) 

class AddRatingRoundoff(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        
        file = request.data.get('file')
        decoded_file = file.read().decode()
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)
    
        df = pd.DataFrame(reader)
        df_copy = df.copy()
        loc = df.columns.get_loc('Rating')
       
        ## -- Rounding of the rating -- ##
        rating_roundoff = []
        for value in df['Rating']:
            if value == "NaN":
                value = 0
            else:
                value = eval(value)

            value = round(value)
            rating_roundoff.append(value)
        ## -- End -- ##

        df_copy.insert(loc+1, 'Rating Roundoff', rating_roundoff)

        path = 'media/uploads/ratingroundoff.csv'
        df_copy.to_csv(path)

        data = [{
            'name': 'Rating Roundoff', 'url': path
        }]
        return Response(data, status=status.HTTP_200_OK) 