import { v1 } from "@authzed/authzed-node";
console.log(`asd
asd
asd
asd
asd
`);
const client = v1.NewClient('tc_nikel_default_token_c97a0c8b5e9a586886b97a75e47aaac669d19511018b1f62bc7df00379063d80e5cced915903ef6f3c0145ae226c2b301d4811ea27639492c3c79077600c0e05', 'grpc.authzed.com:443').promises;

const checkPermissionRequest = v1.CheckPermissionRequest.create({
  resource: v1.ObjectReference.create({
    objectType: 'nikel/document',
    objectId: 'firstdoc',
  }),
  permission: 'read',
  subject: v1.SubjectReference.create({
    object: v1.ObjectReference.create({
      objectType: 'nikel/user',
      objectId: 'sarah',
    }),
  }),
  consistency: v1.Consistency.create({
    requirement: {
      oneofKind: 'fullyConsistent',
      fullyConsistent: true,
    },
  }),
});

try {
  const response = await client.checkPermission(checkPermissionRequest);
  console.log('file: index.ts:33 ~ response:', response);
  console.assert(
    response.permissionship === v1.CheckPermissionResponse_Permissionship.HAS_PERMISSION,
    'does not have permission'
  )
} catch (error) {
  console.log('file: index.ts:38 ~ error:', error);
}
