import Dexie from 'dexie';

const db = new Dexie('UrbaniceParcelDB');
db.version(1).stores({ parcelInfo:'++id, parcelNo, recipientUnitNo, recipientName, deliveryName, parcelType, trackingNo, importDate'});

export default db;