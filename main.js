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
    volume: 0.5
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
      this.status = STATUSES.STOPPED;

      if (autoplay) this.play();
    },

    play: function () {
      this.status = STATUSES.PLAYING;
      this.audioElement.play();
    },

    pause: function () {
      this.status = STATUSES.PAUSED;
      this.audioElement.pause();
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
    }
  }
});