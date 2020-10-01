export default class MusicProvider {
  static instance: MusicProvider;

  static sharedProvider() {
    if (!MusicProvider.instance) {
      MusicProvider.instance = new MusicProvider();
    }
    return MusicProvider.instance;
  }

  configure(developerToken: string, appName: string, build: string = '2020.10.01') {
    (window as any).MusicKit.configure({
      developerToken,
      app: {
        name: appName,
        build,
      },
    });
  }

  getMusicInstance() {
    return (window as any).MusicKit.getInstance();
  }
}
