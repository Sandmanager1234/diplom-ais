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
    
    def create(self, validated_data):
        invited_participants = validated_data.pop('participants', [])
        meeting = Meeting.objects.create(**validated_data)
        for participant_data in invited_participants:
            MeetingParticipant.objects.create(meeting=meeting, **participant_data)
        return meeting
    
    def update(self, instance, validated_data):
        invited_participants = validated_data.pop('participants', [])
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.start_time = validated_data.get('start_time', instance.start_time)
        instance.end_time = validated_data.get('end_time', instance.end_time)
        instance.location = validated_data.get('location', instance.location)
        instance.save()

        for participant_data in invited_participants:
            participant_id = participant_data.get('id')
            if participant_id:
                participant = MeetingParticipant.objects.get(id=participant_id, meeting=instance)
                participant.email = participant_data.get('email', participant.email)
                participant.status = participant_data.get('status', participant.status)
                participant.save()
            else:
                MeetingParticipant.objects.create(meeting=instance, **participant_data)
        return instance