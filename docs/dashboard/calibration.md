# Calibration archives (C9 preview)

**This preview captures calibration data; it does not yet restore a professional
calibration after a factory reset. Do not reset the TV relying on this archive
alone.** Keep the calibrator's original files and an independent backup.

The Server tab's **Calibration archive** is separate from **Settings backup**.
Settings backups, including daily backups, do not contain picture calibration.
The audio EDID helper is a separate project and has no role in this feature.

## Download and check

**Download calibration archive** reads the TV without changing its picture,
input, calibration mode or OLED protections. It downloads a private JSON file
containing stored calibration-file bytes, checksums, factory white-balance
readings and requested picture-context readings. **Check archive** checks its
file and metadata integrity and compares its TV identity and firmware with the
current TV. It never applies the archive.

The initial capture profile accepts C9 TVs reporting firmware 05.50.00. It is
based on the storage observed on an OLED65C9PUA (webOS 4.10.2); the generalized
capture needs a hardware trial. Other models and firmware are refused.
A readable hardware identity is required. The buttons require dashboard
controls to be allowed and use the existing authentication and origin guards.

Capture runs only on request. It reads the files and calibration readings twice
and refuses a changing snapshot. Do not change picture settings while it reads.
One capture runs at a time, with a 40-second limit. The archive downloads to
the browser; it is not saved on the TV or included in daily settings backups.
Keep it privately off the TV. A TV-only copy can be lost along with the TV's
settings. Do not post calibration archives in public issues.

## Coverage

The archive's coverage is always marked **partial**, with restoration disabled.
It currently includes allowlisted stored files from
`/mnt/lg/cmn_data/external_pqldb` and the Dolby Vision user-display configuration.
It requests cool, medium and warm factory white balance, plus selected SDR
Expert, HDR Cinema/Home and Dolby Vision Cinema/Home settings for apps/default
and HDMI 1–4. Unknown files are listed as skipped and not read.

Each requested context records what the TV actually reports. A successful
getter without the exact requested input, range and picture mode in its reply
is not counted as a confirmed context. A confirmed context does not establish
that every calibration setting was returned. Missing values and absent factory
white-balance replies remain gaps; no input or picture mode is switched to fill
them in. Alternate modes, application-specific settings, enable-state semantics
and unsupported settings may still be missing.

EEPROM contents are not captured. There is no probing of I2C buses or raw
hardware access. The archive's identity binds it to the mainboard/network
hardware; it cannot establish that the panel has not been replaced. A matching
identity is therefore necessary evidence for a future restore, not proof that
restoration is safe.

File and manifest hashes detect accidental damage, not authenticity. A person
who edits an archive can also replace its hashes. Imported claims such as
`complete: true` cannot enable restoration: coverage is recomputed by the
server, and no calibration-restore endpoint exists.

## Work needed for factory-reset recovery

A supported restore needs a model/firmware-specific implementation and evidence:

1. Establish which stored files, menu settings, flags and EEPROM regions
   determine each calibrated profile, including their input/range association.
   Read-only capture must prove coverage without silently using another mode.
2. Establish whether captured LUT data is the uploaded data or an effective,
   post-processed result. Calibration getters can behave differently between
   models and firmware; an effective readback must not be uploaded as though
   it were the original.
3. Qualify the restore API, reload behavior, ordering, ownership and rollback
   on a test TV. File replacement alone is not evidence that the running
   picture pipeline has adopted the data.
4. Require a matching TV/panel/firmware, a preview of exactly what will change,
   an independent pre-restore archive and TV-local interruption recovery.
   Other panels' calibration and raw whole-EEPROM writes must remain excluded.
5. Verify stored bytes, mode associations, white balance and measured picture
   output after restoration. Do not factory-reset a professionally calibrated
   owner's TV merely to qualify this preview.

The upstream [bscpylgtv calibration documentation](https://github.com/chros73/bscpylgtv#calibration-functionality-in-full-version)
describes model-dependent getters and calibration uploads. It is research for
future qualification, not a runtime dependency or an enabled restore path.
