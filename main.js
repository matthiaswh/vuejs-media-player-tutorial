const STATUSES = {
  'STOPPED': 0,
  'PAUSED': 1,
  'PLAYING': 2
};

var app = new Vue({
  el: '#media-player',

  data: {
    tracks: [
      {
        'url': 'https://matthiashager.com/cc0-music/Brad_Sucks_-_07_-_Total_Breakdown.mp3',
        'title': 'Total Breakdown',
        'artist': 'Brad Sucks'
      },
      {
        'url': 'https://matthiashager.com/cc0-music/Carb_On_Carb_-_01_-_Smash.mp3',
        'title': 'Smash',
        'artist': 'Carb on Carb'
      },
      {
        'url': 'https://matthiashager.com/cc0-music/Choc_-_01_-_Eigenvalue_Subspace_Decomposition.mp3',
        'title': 'Eigenvalue Subspace Decomposition',
        'artist': 'Choc'
      },
      {
        'url': 'https://matthiashager.com/cc0-music/Paper_Navy_-_08_-_Swan_Song.mp3',
        'title': 'Swan Song',
        'artist': 'Paper Navy'
      },
      {
        'url': 'https://matthiashager.com/cc0-music/Sean_Fournier_-_06_-_Falling_For_You_Piano_Version.mp3',
        'title': 'Falling for You Piano Version',
        'artist': 'Sean Fournier'
      },
      {
        'url': 'https://matthiashager.com/cc0-music/Carb_On_Carb_-_03_-_Practising_for_Retirement.mp3',
        'title': 'Practising for Retirement',
        'artist': 'Carb on Carb'
      }
    ],
    activeTrack: 0,
    audioElement: null,
    status: STATUSES.STOPPED,
    duration: '0:00',
    volume: 5,
    progress: 0
  },

  methods: {
    toggleStatus: function () {
      if ( !this.isTrackLoaded ) {
        this.loadTrack(this.activeTrack || 0);
      }

      if ( !this.isPlaying ) {
        this.play();
        return;
      }

      this.pause();
    },

    loadTrack: function (index, autoplay=false) {
      if ( this.audioElement ) this.audioElement.pause();

      if ( index >= this.tracks.length ) return false; // we should probably do something when the track doesn't exist

      this.activeTrack = index;
      this.audioElement = new Audio(this.tracks[index].url);
      this.updateVolume();
      this.status = STATUSES.STOPPED;

      this.audioElement.addEventListener('ended', this.loadNextTrack);
      // this.audioElement.addEventListener('timeupdate ', this.updateProgress); // this one's not being fired for me :/
      this.audioElement.ontimeupdate = this.updateProgress;

      var $vm = this;
      this.audioElement.addEventListener('durationchange', function () {
        $vm.duration = $vm.audioElement.duration;
      });

      if (autoplay) this.play();
    },

    loadNextTrack: function (autoplay=true) {
      this.activeTrack++;

      if (this.activeTrack >= this.tracks.length) {
        this.activeTrack = 0;
      }

      this.loadTrack(this.activeTrack, autoplay);
    },

    play: function () {
      this.status = STATUSES.PLAYING;
      this.audioElement.play();
    },

    pause: function () {
      this.status = STATUSES.PAUSED;
      this.audioElement.pause();
    },

    updateVolume: function () {
      this.audioElement ? this.audioElement.volume = (this.volume / 10) : null;
    },

    updateProgress: function () {
      if (!this.audioElement || !this.audioElement.currentTime) return this.progress = 0;

      this.progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
    }
  },

  computed: {
    isPaused: function () {
      return STATUSES.PAUSED === this.status;
    },

    isPlaying: function () {
      return STATUSES.PLAYING === this.status;
    },

    isTrackLoaded: function () {
      return (this.activeTrack !== null) && this.audioElement;
    },

    prettyDuration: function () {
      if (!this.audioElement || !this.duration) return '0:00';

      return parseInt(this.audioElement.duration / 60) + ':' + parseInt(this.audioElement.duration % 60);
    }
  },

  watch: {
    volume: function (val) {
      this.updateVolume();
    }
  }
});