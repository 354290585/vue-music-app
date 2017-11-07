export default class Singer {
  constructor({id, name, songnum, albumnum, singermid}) {
    this.id = id;
    this.name = name;
    this.songnum = songnum;
    this.albumnum = albumnum;
    this.singermid = singermid;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    this.avatar2 = `https://y.gtimg.cn/music/photo_new/T001R68x68M000${singermid}.jpg?max_age=2592000`
  }
}
