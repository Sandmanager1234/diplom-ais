from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from .models import Meeting
from .serializers import MeetingSerializer, MeetingDetailSerializer


class MeetingViewSet(ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return MeetingSerializer
        elif self.action in ['create', 'update', 'partial_update', 'retrieve']:
            return MeetingDetailSerializer
        return super().get_serializer_class()







