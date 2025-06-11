from rest_framework import serializers
from .models import Meeting, MeetingParticipant



class MeetingParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingParticipant
        fields = ('__all__')


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('__all__')
        read_only_fields = ('created_by', 'created_at', 'updated_at', 'is_active')


class MeetingDetailSerializer(serializers.ModelSerializer):
    participants = MeetingParticipantSerializer(many=True, read_only=True)

    class Meta:
        model = Meeting
        fields = ('__all__')
        read_only_fields = ('created_by', 'created_at', 'updated_at', 'is_active')
        depth = 1 